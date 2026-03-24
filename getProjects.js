const fs = require('fs');
const path = require('path');
const baseDir = path.join(__dirname, 'public', 'Potfolio');
const distExts = ['.png', '.jpg', '.jpeg', '.webp'];

const dirs = fs.readdirSync(baseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const projects = dirs.map(dir => {
  const dirPath = path.join(baseDir, dir);
  const files = fs.readdirSync(dirPath);
  let imageFile = files.find(f => distExts.includes(path.extname(f).toLowerCase()));
  return {
    name: dir,
    description: `A modern web application built for the ${dir} project, featuring responsive UI and robust functionality.`,
    tech: ['React', 'Tailwind', 'Node.js'],
    image: imageFile ? `/Potfolio/${dir}/${imageFile}` : ''
  };
});

console.log(JSON.stringify(projects, null, 2));
