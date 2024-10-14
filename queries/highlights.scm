"fn" @keyword
"const" @keyword
"struct" @keyword
"pub" @keyword
"let" @keyword
"comptime" @keyword
"if" @keyword
"else" @keyword

"true" @constant.builtin
"false" @constant.builtin

["*" "+" "-" "=" "=="] @operator

(line_comment) @comment
(integer_literal) @number
["{" "}" "(" ")"] @punctuation.bracket
["." ":"] @punctuation.delimiter
(fn_decl
  name: (name) @function)
; (const_decl
;   name: (name) @function)
(builtin_call
  builtin_function: (builtin_function) @function.builtin)
(param
  name: (name) @variable.parameter)
(raw_string_part) @string
