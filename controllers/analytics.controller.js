import {
  getWeeklyEarnings,
  getMonthlyEarnings,
  getUserEarnings,
} from "../services/analytics.service.js";
import httpStatus from "http-status";
import * as response from "../middlewares/response-handler.js";
const responseHandler = response.default;

// import { getUserEarnings } from "../services/analytics.service.js";
import PDFDocument from "pdfkit";
import { Readable } from "stream";
import * as errors from "../utils/api-error.js";
const { NotFoundError, BadRequestError } = errors.default;
import { findById as findUserById } from "../services/users.service.js";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";

const getWeekly = async (req, res) => {
  const { from, to, user_id } = req.query;

  if (!from || !to || !user_id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      message: "Missing from, to, or user_id",
    });
  }

  const data = await getWeeklyEarnings(from, to, user_id);
  res.status(httpStatus.OK).send(responseHandler(data));
};

const getMonthly = async (req, res) => {
  const { from, to, user_id } = req.query;

  if (!from || !to || !user_id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      success: false,
      message: "Missing from, to, or user_id",
    });
  }

  const data = await getMonthlyEarnings(from, to, user_id);
  res.status(httpStatus.OK).send(responseHandler(data));
};

// const exportEarningsAsPDF = async (req, res) => {
//   const { userId } = req.query;

//   if (!userId) {
//     throw new BadRequestError("User is required");
//   }

//   const user = await findUserById(Number(userId));
//   // console.log(user, "user=====");
//   if (!user) {
//     throw new NotFoundError("User not found");
//   }

//   const earnings = await getUserEarnings(userId);

//   // console.log(earnings, "earnings=====");
//   const doc = new PDFDocument({ margin: 30 });

//   const stream = new Readable();
//   stream._read = () => {}; // Required for stream.pipe()

//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename=earnings_${user.username}.pdf`
//   );
//   res.setHeader("Content-Type", "application/pdf");

//   doc.pipe(res);

//   doc.fontSize(16).text("Earning Report ", { align: "center" });
//   doc.moveDown();

//   // earnings.forEach((item, index) => {
//   //   doc
//   //     .fontSize(12)
//   //     .text(`${index + 1}. Date: ${item.date} | Amount: ₹${item.amount}`, {
//   //       align: "left",
//   //     });
//   // });

//   // Table Header
//   doc
//     .fontSize(12)
//     .text("S.No", 50, doc.y, { continued: true })
//     .text("Date", 100, doc.y, { continued: true })
//     .text("Username", 200, doc.y, { continued: true })
//     .text("Amount(Rs)", 300, doc.y);

//   doc
//     .moveTo(50, doc.y + 2)
//     .lineTo(550, doc.y + 2)
//     .stroke();
//   doc.moveDown(0.5);

//   // Table Rows
//   earnings.forEach((item, index) => {
//     doc
//       .fontSize(11)
//       .text(`${index + 1}`, 50, doc.y, { continued: true })
//       .text(item.date, 100, doc.y, { continued: true })
//       .text(user.username, 200, doc.y, { continued: true })
//       .text(`Rs ${item.amount}`, 320, doc.y);
//   });

//   doc.end();
// };

// const exportEarningsAsPDF = async (req, res) => {
//   const { userId } = req.query;
//   if (!userId) throw new BadRequestError("User is required");

//   const user = await findUserById(Number(userId));
//   if (!user) throw new NotFoundError("User not found");

//   const earnings = await getUserEarnings(userId); // grouped by date

//   const doc = new PDFDocument({ margin: 50 });
//   res.setHeader(
//     "Content-Disposition",
//     `attachment; filename=earnings_${user.username}.pdf`
//   );
//   res.setHeader("Content-Type", "application/pdf");

//   doc.pipe(res);

//   // Title
//   doc.fontSize(16).text("Earning Report", { align: "center" });
//   doc.moveDown(1.5);

//   // Table headers
//   const tableTop = doc.y;
//   const col1 = 50; // S.No
//   const col2 = 100; // Date
//   const col3 = 200; // Username
//   const col4 = 350; // Amount (₹)
//   const rowHeight = 25;

//   // Header row
//   doc.font("Helvetica-Bold").fontSize(12);
//   doc.text("S.No", col1, tableTop);
//   doc.text("Date", col2, tableTop);
//   doc.text("Username", col3, tableTop);
//   doc.text("Amount (Rs)", col4, tableTop);

//   // Draw header line
//   let y = tableTop + rowHeight;
//   doc
//     .moveTo(50, y - 5)
//     .lineTo(550, y - 5)
//     .strokeColor("#000")
//     .lineWidth(1)
//     .stroke();

//   // Data rows
//   let total = 0;
//   doc.font("Helvetica").fontSize(12); // Set once for all rows

//   earnings.forEach((item, index) => {
//     const rowY = y + index * rowHeight;

//     doc.text(index + 1, col1, rowY);
//     doc.text(item.date, col2, rowY);
//     doc.text(user.username, col3, rowY);
//     doc.text(`Rs ${item.amount}`, col4, rowY);

//     // Row separator
//     doc
//       .moveTo(50, rowY + rowHeight - 5)
//       .lineTo(550, rowY + rowHeight - 5)
//       .strokeColor("#ccc")
//       .lineWidth(0.5)
//       .stroke();

//     total += item.amount;
//   });

//   // Total row
//   const totalY = y + earnings.length * rowHeight + 5;
//   doc.font("Helvetica-Bold").fontSize(12);
//   doc.text("Total", col3, totalY);
//   doc.text(`Rs ${total}`, col4, totalY);

//   doc.end();
// };

const exportEarnings = async (req, res) => {
  const { userId, format = "pdf" } = req.query;
  if (!userId) throw new BadRequestError("User is required");

  const user = await findUserById(Number(userId));
  if (!user) throw new NotFoundError("User not found");

  const earnings = await getUserEarnings(userId);

  if (format === "pdf") {
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=earnings_${user.username}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    doc.fontSize(16).text("Earning Report", { align: "center" });
    doc.moveDown(1.5);

    const tableTop = doc.y;
    const col1 = 50,
      col2 = 100,
      col3 = 200,
      col4 = 350;
    const rowHeight = 25;

    doc.font("Helvetica-Bold").fontSize(12);
    doc.text("S.No", col1, tableTop);
    doc.text("Date", col2, tableTop);
    doc.text("Username", col3, tableTop);
    doc.text("Amount (Rs)", col4, tableTop);

    let y = tableTop + rowHeight;
    doc
      .moveTo(50, y - 5)
      .lineTo(550, y - 5)
      .strokeColor("#000")
      .lineWidth(1)
      .stroke();

    let total = 0;
    doc.font("Helvetica").fontSize(12);
    earnings.forEach((item, index) => {
      const rowY = y + index * rowHeight;
      doc.text(index + 1, col1, rowY);
      doc.text(item.date, col2, rowY);
      doc.text(user.username, col3, rowY);
      doc.text(`Rs ${item.amount}`, col4, rowY);

      doc
        .moveTo(50, rowY + rowHeight - 5)
        .lineTo(550, rowY + rowHeight - 5)
        .strokeColor("#ccc")
        .lineWidth(0.5)
        .stroke();
      total += item.amount;
    });

    const totalY = y + earnings.length * rowHeight + 5;
    doc.font("Helvetica-Bold").fontSize(12);
    doc.text("Total", col3, totalY);
    doc.text(`Rs ${total}`, col4, totalY);

    doc.end();
  } else if (format === "csv") {
    const csvFields = ["S.No", "Date", "Username", "Amount (Rs)"];
    const csvData = earnings.map((item, index) => ({
      "S.No": index + 1,
      Date: item.date,
      Username: user.username,
      "Amount (Rs)": item.amount,
    }));

    const parser = new Parser({ fields: csvFields });
    const csv = parser.parse(csvData);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=earnings_${user.username}.csv`
    );
    res.setHeader("Content-Type", "text/csv");
    return res.send(csv);
  } else if (format === "xlsx") {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Earnings");

    worksheet.columns = [
      { header: "S.No", key: "sno", width: 10 },
      { header: "Date", key: "date", width: 15 },
      { header: "Username", key: "username", width: 25 },
      { header: "Amount (Rs)", key: "amount", width: 15 },
    ];

    let total = 0;
    earnings.forEach((item, index) => {
      total += item.amount;
      worksheet.addRow({
        sno: index + 1,
        date: item.date,
        username: user.username,
        amount: item.amount,
      });
    });

    worksheet.addRow({});
    worksheet.addRow({ username: "Total", amount: total });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=earnings_${user.username}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  } else {
    throw new BadRequestError("Unsupported export format");
  }
};

export { getWeekly, getMonthly, exportEarnings };
