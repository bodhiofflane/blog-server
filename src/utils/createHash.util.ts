import bcrypt from 'bcrypt';

const createHash = async (string: string) => {
  try {
    return await bcrypt.hash(string, 3);
  } catch (error) {
    throw error;
  }
}

export default createHash;