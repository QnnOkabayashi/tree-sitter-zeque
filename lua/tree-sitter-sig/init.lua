local M = {}

local is_windows
if jit ~= nil then
    is_windows = jit.os == "Windows"
else
    is_windows = package.config:sub(1, 1) == "\\"
end

local join_paths = function(...)
    local separator
    if is_windows then
        separator = "\\"
    else
        separator = "/"
    end
    return table.concat({ ... }, separator)
end

function M.setup(arg)
    local parser_config = require('nvim-treesitter.parsers').get_parser_configs()
    parser_config.sig = {
        install_info = {
            url = 'https://github.com/QnnOkabayashi/tree-sitter-sig',
            files = { 'src/parser.c' },
            branch = 'main',
        },
        maintainers = { '@QnnOkabayashi' }
    }
    local ok, ft = pcall(require, 'filetype')
    if ok then
        ft.setup({
            overrides = {
                extensions = {
                    sig = 'sig',
                },
            },
        })
    end
end

return M
