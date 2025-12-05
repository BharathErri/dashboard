const { PrismaClient } = require('./lib/generated/prisma');

async function testConnection(url, name) {
    console.log(`Testing connection to ${name}...`);
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: url,
            },
        },
    });

    try {
        await prisma.$connect();
        console.log(`✅ Success: Connected to ${name}`);
        await prisma.$disconnect();
        return true;
    } catch (e) {
        console.log(`❌ Failed: Could not connect to ${name}`);
        console.log(e.message);
        await prisma.$disconnect();
        return false;
    }
}

async function main() {
    // Credentials from running 'Dashboard' container
    await testConnection('postgresql://root:root@localhost:5432/dashboard?schema=public', 'Running Container (root/dashboard)');

    // Credentials from docker-compose.yml
    await testConnection('postgresql://myuser:mypassword@localhost:5432/mydb?schema=public', 'Docker Compose Config (myuser/mydb)');

    // Try default postgres
    await testConnection('postgresql://postgres:postgres@localhost:5432/postgres?schema=public', 'Default (postgres/postgres)');

    // Try myuser with dashboard db?
    await testConnection('postgresql://myuser:mypassword@localhost:5432/dashboard?schema=public', 'Mixed (myuser/dashboard)');
}

main();
