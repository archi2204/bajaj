export default function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    // User details (hardcoded as per challenge requirements)
    const userId = "john_doe_17091999";
    const email = "archisman.das2021@vitstudent.ac.in";
    const rollNumber = "21BCE0585";

    // Separate numbers and alphabets
    const numbers = [];
    const alphabets = [];
    let highestLowercaseAlphabet = null;

    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (isNaN(item)) {
        alphabets.push(item);
        if (item === item.toLowerCase()) {
          if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    });

    console.log(data);

    res.status(200).json({
      is_success: true,
      user_id: userId,
      email: email,
      roll_number: rollNumber,
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highestLowercaseAlphabet
        ? [highestLowercaseAlphabet]
        : [],
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      operation_code: 1,
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
