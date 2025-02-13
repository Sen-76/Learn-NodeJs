import sql from 'msnodesqlv8';

const connectionString: string =
  'server=.;Database=YourDatabaseName;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0};';

const initQueries = [
  "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'YourDatabaseName') CREATE DATABASE YourDatabaseName;",
  'USE YourDatabaseName; CREATE TABLE IF NOT EXISTS Users (Id INT PRIMARY KEY IDENTITY, Name NVARCHAR(100), Email NVARCHAR(100));',
  "USE YourDatabaseName; INSERT INTO Users (Name, Email) VALUES ('John Doe', 'john.doe@example.com');",
];

export const executeQuery = (queryText: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    sql.query(connectionString, queryText, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export const initDatabase = async () => {
  try {
    for (const query of initQueries) {
      console.log(`Executing query: ${query}`);
      await executeQuery(query);
    }
    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
};
