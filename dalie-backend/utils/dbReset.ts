import { sequelize } from "../models";
import UserModel, { User } from "../models/user.model";
import { UserRole } from "../models/user.model";
import DonorModel, { Donor } from "../models/donor.model";
import ProjectModel, { Project, ProjectStatus } from "../models/project.model";

async function resetDatabase() {
  try {
    // 1. Verify connection
    await sequelize.authenticate();
    console.log('Database connection established');

    // 2. Disable foreign key checks
    await sequelize.query('SET CONSTRAINTS ALL DEFERRED');

    // 3. Get query interface for more control
    const queryInterface = sequelize.getQueryInterface();

    // 4. Drop all tables safely
    const tables = await queryInterface.showAllTables();
    if (tables.length > 0) {
      await queryInterface.dropAllTables();
      console.log(`Dropped ${tables.length} tables`);
    } else {
      console.log('No tables to drop');
    }

    // 5. Create tables in correct order
    await DonorModel.sync({ force: true });
    console.log('Donors table created');
    
    await UserModel.sync({ force: true });
    console.log('Users table created');
    
    await ProjectModel.sync({ force: true });
    console.log('Projects table created');
    
    // Add other models in dependency order

    // 6. Re-enable foreign key checks
    await sequelize.query('SET CONSTRAINTS ALL IMMEDIATE');

    // 7. Seed initial data in correct order
    const donor = await DonorModel.create({
      name: 'Default Donor',
      contact_email: 'donor@example.com'
    });

    await ProjectModel.create({
      name: 'Initial Project',
      donor_id: donor.id,
      start_date: new Date(),
      end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: ProjectStatus.ACTIVE
    });

    await UserModel.create({
      email: 'admin@sprodeta.org',
      password_hash: '$2b$12$qFVOexqUL3/qhlHwy8W8eu0S80hxq2h382cTQrJyqyDJiJlCVRBhe',
      first_name: 'Admin',
      last_name: 'User',
      role: UserRole.ADMIN,
      is_active: true
    });

    console.log('Database reset complete!');
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

resetDatabase();