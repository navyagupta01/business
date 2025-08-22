{
  "compilerOptions": {
    "target": "es2020",
    "lib": ["ES2020"],
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./build",
    "rootDir": "./src",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "typeRoots": ["./src/types", "./node_modules/@types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
