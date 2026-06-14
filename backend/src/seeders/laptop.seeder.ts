import { connectDb, disconnectDB } from '@/config/db.config';
import { Laptop } from '@/modules/laptops/laptop.model';
import { ILaptop } from '@/modules/laptops/laptop.type';

// Skor benchmark dari cpubenchmark.net dan videocardbenchmark.net
type LaptopSeed = Omit<ILaptop, 'isActive'>;

const laptopSeeds: LaptopSeed[] = [
  {
    name: 'VivoBook 15 A515',
    brand: 'ASUS',
    price: 4_200_000,
    processor_score: 9200,  // Intel Core i5-1135G7
    gpu_score: 1500,        // Intel Iris Xe Graphics
    ram: 8,
    storage: 512,
    condition: 4,
    age_months: 18,
    screen_size: 15.6,
    battery_life: 7,
  },
  {
    name: 'IdeaPad 3 15ALC6',
    brand: 'Lenovo',
    price: 4_500_000,
    processor_score: 10200, // AMD Ryzen 5 5500U
    gpu_score: 2000,        // AMD Radeon 680M
    ram: 8,
    storage: 512,
    condition: 4,
    age_months: 12,
    screen_size: 15.6,
    battery_life: 8,
  },
  {
    name: 'Pavilion 15-eh2',
    brand: 'HP',
    price: 5_200_000,
    processor_score: 12500, // Intel Core i5-11400H
    gpu_score: 5500,        // NVIDIA GTX 1650
    ram: 8,
    storage: 512,
    condition: 3,
    age_months: 24,
    screen_size: 15.6,
    battery_life: 6,
  },
  {
    name: 'Aspire 5 A515-57',
    brand: 'Acer',
    price: 4_800_000,
    processor_score: 9200,  // Intel Core i5-1135G7
    gpu_score: 1500,        // Intel Iris Xe Graphics
    ram: 8,
    storage: 512,
    condition: 5,
    age_months: 6,
    screen_size: 15.6,
    battery_life: 8,
  },
  {
    name: 'Inspiron 15 3511',
    brand: 'Dell',
    price: 3_700_000,
    processor_score: 9200,  // Intel Core i5-1135G7
    gpu_score: 1500,        // Intel Iris Xe Graphics
    ram: 8,
    storage: 512,
    condition: 3,
    age_months: 30,
    screen_size: 15.6,
    battery_life: 7,
  },
  {
    name: 'GF63 Thin 11SC',
    brand: 'MSI',
    price: 5_500_000,
    processor_score: 12500, // Intel Core i5-11400H
    gpu_score: 5500,        // NVIDIA GTX 1650
    ram: 8,
    storage: 512,
    condition: 4,
    age_months: 18,
    screen_size: 15.6,
    battery_life: 5,
  },
  {
    name: 'TUF Gaming A15 FA506',
    brand: 'ASUS',
    price: 7_800_000,
    processor_score: 13500, // AMD Ryzen 5 5600H
    gpu_score: 7000,        // NVIDIA RTX 3050
    ram: 16,
    storage: 512,
    condition: 4,
    age_months: 20,
    screen_size: 15.6,
    battery_life: 5,
  },
  {
    name: 'IdeaPad Gaming 3 15IHU6',
    brand: 'Lenovo',
    price: 5_000_000,
    processor_score: 12500, // Intel Core i5-11400H
    gpu_score: 5500,        // NVIDIA GTX 1650
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 28,
    screen_size: 15.6,
    battery_life: 5,
  },
  {
    name: 'Victus 15-fa0',
    brand: 'HP',
    price: 6_200_000,
    processor_score: 15800, // Intel Core i5-12500H
    gpu_score: 5500,        // NVIDIA GTX 1650
    ram: 8,
    storage: 512,
    condition: 4,
    age_months: 14,
    screen_size: 15.6,
    battery_life: 6,
  },
  {
    name: 'Legion 5 15ACH6H',
    brand: 'Lenovo',
    price: 9_500_000,
    processor_score: 13500, // AMD Ryzen 5 5600H
    gpu_score: 9500,        // NVIDIA RTX 3060
    ram: 16,
    storage: 512,
    condition: 4,
    age_months: 22,
    screen_size: 15.6,
    battery_life: 5,
  },
  {
    name: 'ROG Strix G15 G513',
    brand: 'ASUS',
    price: 10_500_000,
    processor_score: 16200, // AMD Ryzen 7 5800H
    gpu_score: 9500,        // NVIDIA RTX 3060
    ram: 16,
    storage: 512,
    condition: 3,
    age_months: 26,
    screen_size: 15.6,
    battery_life: 4,
  },
  {
    name: 'Nitro 5 AN515-58',
    brand: 'Acer',
    price: 7_200_000,
    processor_score: 15800, // Intel Core i5-12500H
    gpu_score: 7000,        // NVIDIA RTX 3050
    ram: 8,
    storage: 512,
    condition: 4,
    age_months: 16,
    screen_size: 15.6,
    battery_life: 5,
  },
  {
    name: 'Katana GF76 11UG',
    brand: 'MSI',
    price: 9_800_000,
    processor_score: 17000, // Intel Core i7-11800H
    gpu_score: 9500,        // NVIDIA RTX 3060
    ram: 16,
    storage: 512,
    condition: 3,
    age_months: 28,
    screen_size: 17.3,
    battery_life: 4,
  },
  {
    name: 'VivoBook Pro 14 M3401',
    brand: 'ASUS',
    price: 8_500_000,
    processor_score: 13500, // AMD Ryzen 5 5600H
    gpu_score: 7500,        // NVIDIA RTX 3050 Ti
    ram: 16,
    storage: 512,
    condition: 5,
    age_months: 10,
    screen_size: 14,
    battery_life: 6,
  },
  {
    name: 'ThinkBook 15 G3 ACL',
    brand: 'Lenovo',
    price: 5_500_000,
    processor_score: 10200, // AMD Ryzen 5 5500U
    gpu_score: 2000,        // AMD Radeon 680M
    ram: 8,
    storage: 512,
    condition: 5,
    age_months: 8,
    screen_size: 15.6,
    battery_life: 9,
  },
  {
    name: 'Pavilion Gaming 16-a0',
    brand: 'HP',
    price: 7_500_000,
    processor_score: 15800, // Intel Core i5-12500H
    gpu_score: 7000,        // NVIDIA RTX 3050
    ram: 16,
    storage: 512,
    condition: 4,
    age_months: 18,
    screen_size: 16.1,
    battery_life: 5,
  },
  {
    name: 'ROG Zephyrus G14 GA401',
    brand: 'ASUS',
    price: 14_000_000,
    processor_score: 18200, // AMD Ryzen 9 5900HX
    gpu_score: 11000,       // NVIDIA RTX 3070
    ram: 16,
    storage: 1024,
    condition: 4,
    age_months: 24,
    screen_size: 14,
    battery_life: 5,
  },
  {
    name: 'Legion 5 Pro 16ACH6H',
    brand: 'Lenovo',
    price: 12_500_000,
    processor_score: 16200, // AMD Ryzen 7 5800H
    gpu_score: 11000,       // NVIDIA RTX 3070
    ram: 16,
    storage: 512,
    condition: 3,
    age_months: 30,
    screen_size: 16,
    battery_life: 4,
  },
  {
    name: 'Predator Helios 300 PH315',
    brand: 'Acer',
    price: 13_000_000,
    processor_score: 21500, // Intel Core i7-12700H
    gpu_score: 11000,       // NVIDIA RTX 3070
    ram: 16,
    storage: 512,
    condition: 4,
    age_months: 20,
    screen_size: 15.6,
    battery_life: 4,
  },
  {
    name: 'TUF Dash F15 FX517',
    brand: 'ASUS',
    price: 9_200_000,
    processor_score: 17000, // Intel Core i7-11800H
    gpu_score: 9500,        // NVIDIA RTX 3060
    ram: 16,
    storage: 512,
    condition: 4,
    age_months: 22,
    screen_size: 15.6,
    battery_life: 5,
  },
];

// ─── Seeder ───────────────────────────────────────────────────────────────────

const up = async (): Promise<void> => {
  console.log('\n🌱 Memulai proses seeding laptop...\n');

  let created = 0;
  let skipped = 0;

  for (const data of laptopSeeds) {
    const exists = await Laptop.findOne({ name: data.name, brand: data.brand });

    if (exists) {
      console.log(`⚠️  Dilewati: "${data.brand} ${data.name}" sudah ada`);
      skipped++;
      continue;
    }

    await Laptop.create(data);
    console.log(`✅ Dibuat   : "${data.brand} ${data.name}"`);
    created++;
  }

  console.log(`\n📊 Hasil seeding:`);
  console.log(`   - Dibuat  : ${created} laptop`);
  console.log(`   - Dilewati: ${skipped} laptop`);
};

// ─── Down (hanya development) ─────────────────────────────────────────────────

const down = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('❌ Perintah down tidak diizinkan di environment production!');
  }

  const { deletedCount } = await Laptop.deleteMany({});
  console.log(`\n🗑️  ${deletedCount} data laptop berhasil dihapus`);
};

// ─── Entry point ──────────────────────────────────────────────────────────────

const run = async (): Promise<void> => {
  const arg = process.argv[2]; // "up" | "down"

  try {
    await connectDb();

    if (arg === 'down') {
      await down();
    } else {
      await up();
    }
  } catch (err) {
    console.error('\n❌ Seeder gagal:', (err as Error).message);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
};

run();
