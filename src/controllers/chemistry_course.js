const db = require("../../database");

exports.createCourse = async (req, res, formattedFileUrls) => {
  const { title } = req.body;
  //   console.log(req.body);
  //   console.log(formattedFileUrls);

  try {
    // const title = req.body.title; // Assuming title is included in the request body
    const coverImg = formattedFileUrls.cover_image[0].downloadURL;
    const page = [];

    if (formattedFileUrls.page1 && formattedFileUrls.page1[0]?.downloadURL) {
      page.push(formattedFileUrls.page1[0].downloadURL);
    }

    if (formattedFileUrls.page2 && formattedFileUrls.page2[0]?.downloadURL) {
      page.push(formattedFileUrls.page2[0].downloadURL);
    }

    if (formattedFileUrls.page3 && formattedFileUrls.page3[0]?.downloadURL) {
      page.push(formattedFileUrls.page3[0].downloadURL);
    }

    if (formattedFileUrls.page4 && formattedFileUrls.page4[0]?.downloadURL) {
      page.push(formattedFileUrls.page4[0].downloadURL);
    }

    if (formattedFileUrls.page5 && formattedFileUrls.page5[0]?.downloadURL) {
      page.push(formattedFileUrls.page5[0].downloadURL);
    }

    // Check if the title already exists in the chemistry table
    const titleExists = await db.query(
      "SELECT * FROM chemistry WHERE title = $1",
      [title]
    );

    if (titleExists.rows.length > 0) {
      return res.status(400).json({
        error: "chemistry with the provided title already exist.",
      });
    }

    await db.query(
      `INSERT INTO chemistry (title, cover_img, page) VALUES ($1, $2, $3)`,
      [title, coverImg, page]
    );

    return res.status(201).json({
      success: true,
      message: "The Chapter Submitted was successfull",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getallCourse = async (req, res) => {
  try {
    const { rows } = await db.query("select * from chemistry");

    return res.status(200).json({
      success: true,
      course: rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await db.query("SELECT * FROM chemistry WHERE id = $1", [
      id,
    ]);
    res.json(course.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

// Delete Course by id

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await db.query("DELETE FROM chemistry WHERE id = $1", [id]);
    res.json("Deleted Successfully !!");
  } catch (err) {
    console.log(err.message);
  }
};
