
const { sql, config } = require('../db/config');
const { v4: uuidv4 } = require('uuid'); // ใช้แทนระบบล็อคอินไปก่อน
const dummyUserId = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
//#region GET
exports.getAllLogTypes = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ICONIC_LogTypes');
    if (result.recordset.length === 0) {
      res.status(404).send('ไม่พบข้อมูล');
    } else {
      res.json(result.recordset);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};

exports.getAllLogTypesUsed = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ICONIC_LogTypes WHERE IsDeleted = 0');
    if (result.recordset.length === 0) {
      res.status(404).send('ไม่พบข้อมูล');
    } else {
      res.json(result.recordset);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};

exports.getAllLogTypesDeleted = async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM ICONIC_LogTypes WHERE IsDeleted = 1');
    if (result.recordset.length === 0) {
      res.status(404).send('ไม่พบข้อมูล');
    } else {
      res.json(result.recordset);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};

exports.getLogTypeById = async (req, res) => {
  const id = req.params.id;
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ICONIC_LogTypes WHERE ID = ${id}`;
    if (result.recordset.length === 0) {
      res.status(404).send('ไม่พบข้อมูล');
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};

exports.getLogTypeByName = async (req, res) => {
  const id = req.params.id;
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM ICONIC_LogTypes WHERE Name = ${id}`;
    if (result.recordset.length === 0) {
    console.error('ไม่พบข้อมูล');
      res.status(404).send('ไม่พบข้อมูล');
    } else {
      res.json(result.recordset[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};
//#endregion
//#region  POST

exports.createLogType = async (req, res) => {
  const { Name, Detail } = req.body;

  const ID = uuidv4();
  const CreateBy = dummyUserId;  // สมมุติผู้ใช้ชั่วคราว
  const UpdateBy = dummyUserId;
  const CreateDate = new Date();
  const UpdateDate = CreateDate;
  const IsDeleted = 0;

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO ICONIC_LogTypes
      (ID, Name, Detail, CreateBy, UpdateBy, CreateDate, UpdateDate, IsDeleted)
      VALUES
      (${ID}, ${Name}, ${Detail}, ${CreateBy}, ${UpdateBy}, ${CreateDate}, ${UpdateDate}, ${IsDeleted})
    `;
    console.debug('เพิ่มข้อมูลเรียบร้อย')
    res.status(201).send('เพิ่มข้อมูลเรียบร้อย');
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};

//#endregion
//#region PUT
exports.EditLogType = async (req, res) => {
  const { Pk, Name, Detail, IsDeleted } = req.body;

  const ID = Pk;
  const UpdateBy = dummyUserId; // อย่าลืมประกาศตัวแปรนี้ก่อนใช้งาน
  const UpdateDate = new Date();

  try {
    await sql.connect(config);
    await sql.query`
      UPDATE ICONIC_LogTypes
      SET Name = ${Name},
          Detail = ${Detail},
          UpdateBy = ${UpdateBy},
          UpdateDate = ${UpdateDate},
          IsDeleted = ${IsDeleted}
      WHERE ID = ${ID}
    `;
    console.debug('แก้ไขข้อมูลเรียบร้อยแล้ว');
    res.status(200).send('แก้ไขข้อมูลเรียบร้อยแล้ว');
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};

//#endregion
//#region Remove
exports.removeLogType = async (req, res) => {
  const ID = req.params.id;

  if (!ID) return res.status(400).send('กรุณาระบุ ID');

  try {
    await sql.connect(config);
    const result = await sql.query`
      DELETE FROM ICONIC_LogTypes
      WHERE ID = ${ID}
    `;

    if (result.rowsAffected[0] === 0) {
      res.status(404).send('ไม่พบข้อมูล');
    } else {
      res.status(200).send('ลบสำเร็จ');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('เกิดข้อผิดพลาด');
  } finally {
    await sql.close();
  }
};
//#endregion
