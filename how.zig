const std = @import("std");
const builtin = @import("builtin");
const http = std.http;
const heap = std.heap;

const exit = std.process.exit;

const arch = builtin.target.osArchName();
const platform = @tagName(builtin.os.tag);

const systemPrompt =
    \\You are "how", a CLI command generator.
    \\
    \\First line of the response is the description in one sentence.
    \\Subsequent lines of the response are the CLI commands to achieve user's goal.
    \\Do not add anything else, no markdown, just pain text.
    \\
    \\System Info:
++ " " ++ platform ++ " " ++ arch ++ "\n" ++
    \\Example input:
    \\how to build and install go binary
    \\
    \\Example output:
    \\Building and installing a Go binary
    \\go build main.go
    \\go install main
;

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "";

const Client = http.Client;
const RequestOptions = Client.RequestOptions;

const ChatMessage = struct {
    role: []const u8,
    content: []const u8,
};

const ChatCompelitionRequestBody = struct {
    model: []const u8,
    messages: []const ChatMessage,
};

const ChatChoice = struct {
    index: usize,
    message: ChatMessage,
};

const ChatCompletionResponseBody = struct {
    id: []const u8,
    choices: []const ChatChoice,
};

const FetchReq = struct {
    const Self = @This();
    const Allocator = std.mem.Allocator;

    allocator: Allocator,
    client: std.http.Client,
    body: std.ArrayList(u8),

    pub fn init(allocator: Allocator) Self {
        const c = Client{ .allocator = allocator };
        return Self{
            .allocator = allocator,
            .client = c,
            .body = std.ArrayList(u8).init(allocator),
        };
    }

    pub fn deinit(self: *Self) void {
        self.client.deinit();
        self.body.deinit();
    }

    pub fn post(self: *Self, url: []const u8, body: []const u8) !Client.FetchResult {
        const headers = [_]http.Header{
            .{ .name = "Content-Type", .value = "application/json" },
            .{ .name = "Authorization", .value = "Bearer " ++ API_KEY },
        };

        const fetch_options = Client.FetchOptions{
            .location = Client.FetchOptions.Location{ .url = url },
            .extra_headers = &headers,
            .method = .POST,
            .payload = body,
            .response_storage = .{ .dynamic = &self.body },
        };

        const res = try self.client.fetch(fetch_options);

        return res;
    }
};

pub fn main() !void {
    var gpa_impl = heap.GeneralPurposeAllocator(.{}){};
    defer if (gpa_impl.deinit() == .leak) {
        std.log.warn("Has leaked\n", .{});
    };
    const gpa = gpa_impl.allocator();

    var req = FetchReq.init(gpa);
    defer req.deinit();

    const data = ChatCompelitionRequestBody{
        .model = "gpt-4o",
        .messages = &[_]ChatMessage{
            ChatMessage{
                .role = "system",
                .content = systemPrompt,
            },
            ChatMessage{
                .role = "user",
                .content = "how to get the size of directory",
            },
        },
    };

    const json_data = try std.json.stringifyAlloc(gpa, data, .{});
    defer gpa.free(json_data);

    const res = try req.post(OPENAI_URL, json_data);

    const body = try req.body.toOwnedSlice();
    defer req.allocator.free(body);

    if (res.status != .ok) {
        std.log.err("Request Failed \n\n {?s}\n", .{body});
        std.process.exit(1);
    }

    const parsed = try std.json.parseFromSlice(ChatCompletionResponseBody, gpa, body, .{ .ignore_unknown_fields = true });
    defer parsed.deinit();

    const content = parsed.value.choices[0].message.content;

    var it = std.mem.splitAny(u8, content, "\n");

    const description = it.first();

    std.debug.print("\x1b[1;34m\n{s}\n\n\x1b[0m", .{description});

    while (it.next()) |x| {
        std.debug.print("\x1b[1;90m\t$ {s}\n\x1b[0m", .{x});
    }

    std.debug.print("\n", .{});
}
