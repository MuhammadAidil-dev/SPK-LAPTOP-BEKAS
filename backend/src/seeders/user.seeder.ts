import { connectDb, disconnectDB } from '@/config/db.config';
import { loadEnv } from '@/config/env';
import { Users } from '@/modules/users/user.model';
import { IUser } from '@/modules/users/user.type'; // sesuaikan path jika berbeda

// ─── Data seed ───────────────────────────────────────────────────────────────

const env = loadEnv();

interface AdminSeed {
  email: string;
  password: string;
  role: IUser['role'];
}

const adminSeeds: AdminSeed[] = [
  {
    email: env.ADMIN.ADMIN_EMAIL,
    password: env.ADMIN.ADMIN_PASSWORD,
    role: 'admin',
  },
];

// ─── Seeder ───────────────────────────────────────────────────────────────────

const seed = async (): Promise<void> => {
  console.log('\n🌱 Memulai proses seeding admin...\n');

  let created = 0;
  let skipped = 0;

  for (const data of adminSeeds) {
    const exists = await Users.findOne({
      email: data.email,
    });

    if (exists) {
      console.log(`⚠️  Dilewati: "${data.email}" sudah ada di database`);
      skipped++;
      continue;
    }

    // Password di-hash otomatis oleh pre-save hook di UserSchema
    await Users.create(data);
    console.log(`✅ Dibuat   : "${data.email}" (${data.role})`);
    created++;
  }

  console.log(`\n📊 Hasil seeding:`);
  console.log(`   - Dibuat  : ${created} admin`);
  console.log(`   - Dilewati: ${skipped} admin`);
};

// ─── Clear (hanya development) ────────────────────────────────────────────────

const clear = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '❌ Perintah clear tidak diizinkan di environment production!',
    );
  }

  const { deletedCount } = await Users.deleteMany({
    role: { $in: ['admin', 'superadmin'] },
  });
  console.log(
    `\n🗑️  ${deletedCount} data admin berhasil dihapus dari database`,
  );
};

// ─── Entry point ─────────────────────────────────────────────────────────────

const run = async (): Promise<void> => {
  const arg = process.argv[2]; // "seed" | "clear"

  try {
    await connectDb();

    if (arg === 'clear') {
      await clear();
    } else {
      await seed();
    }
  } catch (err) {
    console.error('\n❌ Seeder gagal:', (err as Error).message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

run();
