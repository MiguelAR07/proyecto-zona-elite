const db = require('../config/db');

exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, name, email, role, available_classes, created_at
      FROM users
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.updateUserClasses = async (req, res) => {
  try {
    const { id } = req.params;
    const { available_classes } = req.body;

    if (available_classes === undefined) {
      return res.status(400).json({ error: 'available_classes is required' });
    }

    const result = await db.query(
      'UPDATE users SET available_classes = $1 WHERE id = $2 RETURNING id, name, email, available_classes',
      [available_classes, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error updating user classes:', error);
    res.status(500).json({ error: 'Failed to update user classes' });
  }
};
