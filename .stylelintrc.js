module.exports = {
    "plugins": [
        "stylelint-no-unsupported-browser-features"
    ],
    "rules": {
        "at-rule-name-space-after"                         : "always",
        "color-named"                                      : "never",
        "color-no-invalid-hex"                             : true,
        "declaration-bang-space-after"                     : "never",
        "declaration-bang-space-before"                    : "always",
        "declaration-block-no-duplicate-properties"        : [true, { "ignore": ["consecutive-duplicates"] }],
        "declaration-block-no-shorthand-property-overrides": true,
        "font-family-name-quotes"                          : "always-unless-keyword",
        "function-calc-no-unspaced-operator"               : true,
        "function-name-case"                               : "lower",
        "function-url-quotes"                              : "always",
        "media-feature-colon-space-after"                  : "always",
        "media-feature-colon-space-before"                 : "never",
        "media-feature-range-operator-space-after"         : "always",
        "media-feature-range-operator-space-before"        : "always",
        "no-duplicate-selectors"                           : true,
        "no-invalid-double-slash-comments"                 : true,
        "number-max-precision"                             : 3,
        "selector-attribute-brackets-space-inside"         : "never",
        "selector-attribute-operator-space-after"          : "never",
        "selector-attribute-operator-space-before"         : "never",
        "selector-pseudo-class-no-unknown"                 : [true, {
            "ignorePseudoClasses": ["export"]
        }],
        "selector-pseudo-class-parentheses-space-inside"   : "never",
        "selector-pseudo-element-colon-notation"           : "single",
        "selector-pseudo-element-no-unknown"               : true,
        "selector-type-case"                               : "lower",
        "selector-type-no-unknown"                         : [true, { "ignoreTypes": ["from", "to", "0%", "50%", "100%", "_"] }],
        "shorthand-property-no-redundant-values"           : true,
        "string-no-newline"                                : true,
        "time-min-milliseconds"                            : 100,
        "unit-allowed-list"                                   : ["fr", "px", "em", "rem", "%", "vw", "vh", "deg", "ms", "s", "dpcm"],
        "value-keyword-case"                               : "lower"
    },
    "extends": [
        // other configs ...
        "stylelint-config-prettier"
    ]
};
