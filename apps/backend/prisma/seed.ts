import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'CultureUP Demo',
      plan: 'freemium'
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@cultureup.demo' },
    update: {},
    create: {
      email: 'admin@cultureup.demo',
      name: 'Admin Demo',
      role: 'owner',
      locale: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      tenantId: tenant.id
    }
  });

  console.log('Seed concluída');
}

main().finally(async () => {
  await prisma.$disconnect();
});
