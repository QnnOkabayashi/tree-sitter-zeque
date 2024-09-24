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
    parser_config.zeque = {
        install_info = {
            url = 'https://github.com/QnnOkabayashi/tree-sitter-zeque',
            files = { 'src/parser.c' },
            branch = 'main',
        },
        maintainers = { '@QnnOkabayashi' }
        filetype = "zq"
    }
    -- local ok, ft = pcall(require, 'filetype')
    -- if ok then
    --     ft.setup({
    --         overrides = {
    --             extensions = {
    --                 zeque = 'zq',
    --             },
    --         },
    --     })
    -- end
end

return M
