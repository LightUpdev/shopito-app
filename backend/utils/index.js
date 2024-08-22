import pkg from "jsonwebtoken";
const { sign } = pkg;

const generateSKU = (name, category) => {
  const randomSuffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const namePart = name.toUpperCase().slice(0, 3);
  const categoryPart = category.toUpperCase().slice(0, 3);
  return `${categoryPart}-${namePart}-${randomSuffix}`;
};

const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export { generateSKU, generateToken };
