/**
 * Template Migration File for migrate-mongo (pnpm)
 * Copy this file to migrations/ and rename it for each migration
 * Example filename: 20251222-add-role-to-users.js
 */

module.exports.up = async (db) => {
  // TODO: تغییرات دیتابیس را اینجا اعمال کن
  // مثال:
  // await db.collection("users").updateMany({}, { $set: { role: "user" } });
};

module.exports.down = async (db) => {
  // TODO: تغییرات up را برگردان
  // مثال:
  // await db.collection("users").updateMany({}, { $unset: { role: "" } });
};
