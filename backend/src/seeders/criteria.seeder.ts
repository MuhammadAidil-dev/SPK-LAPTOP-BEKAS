import { connectDb, disconnectDB } from '@/config/db.config';
import { Criteria } from '@/modules/criteria/criteria.model';
import { ICriteria } from '@/modules/criteria/criteria.type';

const criteriaSeeds: ICriteria[] = [
  {
    name: 'harga',
    weight: 0.4,
    type: 'cost',
  },
  {
    name: 'performa',
    weight: 0.3,
    type: 'benefit',
  },
  {
    name: 'kondisi',
    weight: 0.15,
    type: 'benefit',
  },
  {
    name: 'umur',
    weight: 0.15,
    type: 'cost',
  },
];

const up = async () => {
  for (const data of criteriaSeeds) {
    await Criteria.create(data);
    console.log('Criteria berhasil ditambahkan : ', data);
  }
};

const down = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      '❌ Perintah clear tidak diizinkan di environment production!',
    );
  }
  return await Criteria.deleteMany();
};

const runSeed = async () => {
  const arg = process.argv[2]; // seed | clear

  try {
    await connectDb();

    if (arg === 'down') {
      await down();
      console.log('Data criteria berhasil dihapus');
    } else {
      await up();
    }
  } catch (error) {
  } finally {
    await disconnectDB();
  }
};

runSeed();
