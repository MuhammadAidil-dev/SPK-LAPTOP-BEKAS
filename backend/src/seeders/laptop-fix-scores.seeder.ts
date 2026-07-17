import { connectDb, disconnectDB } from '@/config/db.config';
import { Laptop } from '@/modules/laptops/laptop.model';

/**
 * Perbaikan data 20 alternatif laptop agar sesuai Laporan_Perhitungan_SMART.docx.
 *
 * Sumber Excel (`docs/data laptop smart.xlsx`) menyimpan skor benchmark dengan
 * titik sebagai pemisah ribuan, tapi Excel membacanya sebagai desimal
 * (6277 -> 6.277). Nilai itu ikut terbawa saat input lewat form, sehingga
 * sebagian laptop tersimpan dalam skala ribuan dan sebagian dalam desimal.
 * Campuran skala ini merusak normalisasi min-max di perhitungan SMART.
 *
 * Dicocokkan lewat _id, bukan nama, karena ada dua record bernama
 * "Lenovo Thinkpad X390".
 */
type LaptopFix = {
  _id: string;
  name: string;
  price: number;
  processor_score: number;
  gpu_score: number;
  ram: number;
  storage: number;
  condition: number;
  age_months: number;
};

const fixes: LaptopFix[] = [
  {
    _id: '6a4f483fb58ce4803637525f',
    name: 'Lenovo Thinkpad X390',
    price: 4_500_000,
    processor_score: 6277,
    gpu_score: 445,
    ram: 16,
    storage: 512,
    condition: 4,
    age_months: 18,
  },
  {
    _id: '6a4f4a3ab58ce48036375275',
    name: 'HP ProBook 430 G8',
    price: 5_850_000,
    processor_score: 9324,
    gpu_score: 1794,
    ram: 8,
    storage: 512,
    condition: 5,
    age_months: 12,
  },
  {
    _id: '6a4f4b31b58ce48036375283',
    name: 'HP ProBook 445 G8',
    price: 4_650_000,
    processor_score: 14881,
    gpu_score: 1465,
    ram: 8,
    storage: 256,
    condition: 5,
    age_months: 12,
  },
  {
    _id: '6a4f4d24b58ce4803637528e',
    name: 'Asus Vivobook Go 14',
    price: 3_850_000,
    processor_score: 9595,
    gpu_score: 616,
    ram: 8,
    storage: 512,
    condition: 4,
    age_months: 18,
  },
  {
    _id: '6a4f5c04b58ce48036375299',
    name: 'HP 244 G6',
    price: 2_800_000,
    processor_score: 1324,
    gpu_score: 1014,
    ram: 8,
    storage: 256,
    condition: 4,
    age_months: 24,
  },
  {
    _id: '6a4f5d17b58ce480363752a4',
    name: 'HP Folio 9480m',
    price: 2_650_000,
    processor_score: 5130,
    gpu_score: 1985,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 32,
  },
  {
    _id: '6a4f5e1db58ce480363752af',
    name: 'Dell weyz 5470',
    price: 2_600_000,
    processor_score: 353,
    gpu_score: 100,
    ram: 8,
    storage: 256,
    condition: 4,
    age_months: 32,
  },
  {
    _id: '6a4f5f1db58ce480363752c5',
    name: 'DELL 7470',
    price: 2_750_000,
    processor_score: 6100,
    gpu_score: 859,
    ram: 8,
    storage: 256,
    condition: 4,
    age_months: 18,
  },
  {
    _id: '6a4f606bb58ce480363752d0',
    name: 'Dell latitude 7480',
    price: 2_730_000,
    processor_score: 3201,
    gpu_score: 918,
    ram: 8,
    storage: 256,
    condition: 4,
    age_months: 18,
  },
  {
    _id: '6a4f6691b58ce4803637532f',
    name: 'Acer TravelMate P645-M',
    price: 2_750_000,
    processor_score: 1410,
    gpu_score: 533,
    ram: 8,
    storage: 256,
    condition: 4,
    age_months: 24,
  },
  {
    _id: '6a4f6821b58ce4803637533a',
    name: 'Lenovo ThinkPad T460',
    price: 2_750_000,
    processor_score: 2991,
    gpu_score: 859,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 32,
  },
  {
    _id: '6a5344beb58ce4803637577f',
    name: 'Lenovo G40',
    price: 1_799_998,
    processor_score: 943,
    gpu_score: 388,
    ram: 8,
    storage: 128,
    condition: 3,
    age_months: 120,
  },
  {
    _id: '6a5345edb58ce4803637578a',
    name: 'Lenovo thinkpad T470',
    price: 3_850_000,
    processor_score: 3708,
    gpu_score: 1057,
    ram: 8,
    storage: 256,
    condition: 4,
    age_months: 48,
  },
  {
    _id: '6a534680b58ce48036375795',
    name: 'Lenovo Thinkpad L440',
    price: 3_650_000,
    processor_score: 2523,
    gpu_score: 648,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 38,
  },
  {
    _id: '6a53473eb58ce480363757a0',
    name: 'Acer Swift 3',
    price: 3_650_000,
    processor_score: 3819,
    gpu_score: 783,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 32,
  },
  {
    _id: '6a5347ffb58ce480363757b6',
    name: 'Hp ProBook 645G4',
    price: 2_250_000,
    processor_score: 3920,
    gpu_score: 1020,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 38,
  },
  {
    _id: '6a53489db58ce480363757c1',
    name: 'Advan Soulmate',
    price: 2_500_000,
    processor_score: 1550,
    gpu_score: 319,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 64,
  },
  {
    _id: '6a5349f2b58ce480363757cc',
    name: 'Lenovo IdeaPad 330',
    price: 3_450_000,
    processor_score: 3549,
    gpu_score: 1040,
    ram: 8,
    storage: 256,
    condition: 3,
    age_months: 38,
  },
  {
    _id: '6a5701e3b58ce48036375ad1',
    name: 'Hp 14-BS013TU',
    price: 2_499_998,
    processor_score: 1670,
    gpu_score: 799,
    ram: 8,
    storage: 128,
    condition: 3,
    age_months: 38,
  },
  {
    _id: '6a53aa52b58ce480363758a8',
    name: 'Lenovo Ideapad Slim 3i',
    price: 6_499_999,
    processor_score: 15944,
    gpu_score: 1600,
    ram: 16,
    storage: 512,
    condition: 5,
    age_months: 12,
  },
];

/**
 * Record "Lenovo Thinkpad X390" (Rp 4.000.000) yang tidak ada di 20 alternatif
 * docx. Tidak disentuh oleh script ini — laporkan saja agar dihapus manual.
 */
const UNKNOWN_ID = '6a587893b58ce48036375bae';

const FIELDS = [
  'price',
  'processor_score',
  'gpu_score',
  'ram',
  'storage',
  'condition',
  'age_months',
] as const;

const run = async (apply: boolean) => {
  let changed = 0;
  let missing = 0;

  for (const fix of fixes) {
    const current = await Laptop.findById(fix._id);

    if (!current) {
      console.log(`⚠️  TIDAK DITEMUKAN  ${fix._id}  (${fix.name})`);
      missing++;
      continue;
    }

    const diff = FIELDS.filter((f) => current[f] !== fix[f]);

    if (diff.length === 0) {
      console.log(`✓  ${fix.name} — sudah sesuai`);
      continue;
    }

    changed++;
    console.log(`\n${apply ? '→ UPDATE' : '→ AKAN DIUBAH'}  ${fix.name}`);
    for (const f of diff) {
      console.log(`     ${f}: ${current[f]}  →  ${fix[f]}`);
    }

    if (apply) {
      const payload = Object.fromEntries(FIELDS.map((f) => [f, fix[f]]));
      await Laptop.updateOne({ _id: fix._id }, { $set: payload });
    }
  }

  const unknown = await Laptop.findById(UNKNOWN_ID);
  if (unknown) {
    console.log(
      `\n⚠️  Record di luar 20 alternatif docx (tidak diubah script ini):` +
        `\n     ${UNKNOWN_ID}  ${unknown.name}  Rp ${unknown.price.toLocaleString('id-ID')}` +
        `\n     Hapus manual lewat admin panel bila memang data uji.`,
    );
  }

  console.log(
    `\n${apply ? 'Selesai.' : 'DRY RUN — tidak ada yang ditulis.'}` +
      ` ${changed} laptop perlu diubah, ${missing} tidak ditemukan.`,
  );
  if (!apply && changed > 0) {
    console.log('Jalankan ulang dengan flag --apply untuk menerapkan.');
  }
};

const main = async () => {
  const apply = process.argv.includes('--apply');

  try {
    await connectDb();
    await run(apply);
  } catch (error) {
    console.error('❌ Migrasi gagal:', error);
    process.exitCode = 1;
  } finally {
    await disconnectDB();
  }
};

main();
