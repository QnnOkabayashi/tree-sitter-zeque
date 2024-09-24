"fn" @keyword
"struct" @keyword
"pub" @keyword
"let" @keyword

"true" @constant.builtin
"false" @constant.builtin

["*" "+" "-" "="] @operator

(line_comment) @comment
(name) @constructor
(integer_literal) @number
["{" "}" "(" ")"] @punctuation.bracket
["," "." ":" ";"] @punctuation.delimiter
