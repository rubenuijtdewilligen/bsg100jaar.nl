import { env as privateEnv } from '$env/dynamic/private';
import mysql from 'mysql2/promise';
import { error, fail } from '@sveltejs/kit';

const pool = mysql.createPool({
  host: privateEnv.MYSQL_HOST,
  user: privateEnv.MYSQL_USERNAME,
  password: privateEnv.MYSQL_PASSWORD,
  database: privateEnv.MYSQL_DATABASE,
  timezone: 'Europe/Amsterdam'
});

export const load = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const perPage = 10;
  const offset = (page - 1) * perPage;

  const [rows] = await pool.query(
    'SELECT * FROM guestbook ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [perPage, offset]
  );
  const [[{ count }]] = await pool.query('SELECT COUNT(*) as count FROM guestbook');

  return {
    entries: rows,
    page,
    perPage,
    totalPages: Math.ceil(count / perPage),
    totalCount: count
  };
};

export const actions = {
  postMessage: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !message) {
      return fail(400, {
        data: { name, message },
        errors: {
          name: !name ? ['Naam is vereist'] : undefined,
          message: !message ? ['Bericht is vereist'] : undefined
        }
      });
    }

    try {
      await pool.query('INSERT INTO guestbook (name, message) VALUES (?, ?)', [name, message]);
      return { success: true };
    } catch (err) {
      console.error(err);
      throw error(500, 'Database error');
    }
  }
};
