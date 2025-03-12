const fs = require("fs");
const path = require("path");
const UglifyJS = require("uglify-js");

// 源文件列表
const sourceFiles = [
  "emulator.js",
  "nipplejs.js",
  "shaders.js",
  "storage.js",
  "gamepad.js",
  "GameManager.js",
  "socket.io.min.js",
  "compression.js",
];

// 读取并合并所有源文件
let combined = "";
sourceFiles.forEach(file => {
  const content = fs.readFileSync(
    path.join(__dirname, "data/src", file),
    "utf8"
  );
  combined += content + "\n";
});

// 压缩代码
const minified = UglifyJS.minify(combined);

if (minified.error) {
  console.error("压缩错误:", minified.error);
} else {
  // 写入压缩后的文件
  fs.writeFileSync(
    path.join(__dirname, "data", "emulator.min.js"),
    minified.code
  );
  console.log("编译完成!");
}
