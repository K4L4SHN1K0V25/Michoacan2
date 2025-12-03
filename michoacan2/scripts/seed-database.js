const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  try {
    // Leer el archivo SQL
    const sqlFilePath = path.join(__dirname, '..', 'prisma', 'seed.sql');
    const sqlContent = fs.readFileSync(sqlFilePath, 'utf-8');

    // Dividir en statements individuales
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && s !== 'SET FOREIGN_KEY_CHECKS = 0' && s !== 'SET FOREIGN_KEY_CHECKS = 1');

    console.log(`📄 Ejecutando ${statements.length} statements SQL...\n`);

    // Ejecutar cada statement
    let executed = 0;
    for (const statement of statements) {
      if (statement.toUpperCase().includes('TRUNCATE') ||
          statement.toUpperCase().includes('INSERT') ||
          statement.toUpperCase().includes('SELECT')) {
        try {
          await prisma.$executeRawUnsafe(statement);
          executed++;

          // Mostrar progreso cada 10 statements
          if (executed % 10 === 0) {
            console.log(`   ✓ ${executed}/${statements.length} statements ejecutados...`);
          }
        } catch (error) {
          console.error(`❌ Error en statement: ${statement.substring(0, 100)}...`);
          console.error(`   ${error.message}\n`);
        }
      }
    }

    console.log(`\n✅ Seed completado: ${executed} statements ejecutados exitosamente!\n`);

    // Verificar datos insertados
    console.log('📊 Verificando datos insertados:\n');

    const counts = await Promise.all([
      prisma.users.count(),
      prisma.artists.count(),
      prisma.venues.count(),
      prisma.events.count(),
      prisma.ticket_types.count(),
    ]);

    console.log(`   - Usuarios: ${counts[0]}`);
    console.log(`   - Artistas: ${counts[1]}`);
    console.log(`   - Venues: ${counts[2]}`);
    console.log(`   - Eventos: ${counts[3]}`);
    console.log(`   - Tipos de boletos: ${counts[4]}`);

    console.log('\n🎉 ¡Base de datos lista para usar!\n');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
