module.exports = {
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[tj]s?(x)',
      '**/?(*.)+(spec|test).[tj]m?(x)'  // Agregar esta línea para incluir .mjs
    ],
    testPathIgnorePatterns: [
      '\\\\node_modules\\\\'
    ]
  };