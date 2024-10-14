# tree-sitter-zeque

This repository provides tree-sitter support for the [Zeque](https://github.com/QnnOkabayashi/zeque-lang) programming language.

## Neovim installation

Add the following to your `init.lua`.
On MacOS, it's probably at `~/.config/nvim/init.lua`.

```lua
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()
parser_config.zeque = {
    install_info = {
        url = 'https://github.com/QnnOkabayashi/tree-sitter-zeque',
        files = { 'src/parser.c' },
        branch = 'main',
    },
    maintainers = { '@QnnOkabayashi' },
    filetype = "zq",
}
```

Now Neovim understands Zeque, but it doesn't know how to highlight Zeque code yet.

## Highlighting

To tell Neovim how to highlight your code, it needs to know about a highlighter _locally_ (makes no sense to me either).

To do this, you'll first need to find your Vim runtimepath.

Go into `nvim` anywhere and do `:!echo $VIMRUNTIME`.

Since I installed Neovim with homebrew, I got `/opt/homebrew/Cellar/neovim/0.9.0/share/nvim/runtime`.

Then go to that directory, `/queries/zeque/highlights.scm` and paste in the highlights you want.

```
/opt/homebrew/Cellar/neovim/0.9.0/share/nvim/runtime/queries/zeque/highlights.scm
```

