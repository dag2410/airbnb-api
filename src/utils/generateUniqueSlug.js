const { Room } = require("@/models");
const { default: slugify } = require("slugify");

async function generateUniqueSLug(input) {
  const baseSlug = slugify(input, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;
  while (await Room.findOne({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }
  return slug;
}

module.exports = generateUniqueSLug;
