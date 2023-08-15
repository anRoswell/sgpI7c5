import { Injectable } from '@angular/core';

// Services
import { SQLiteService } from './sqlite.service';

// Capacitor
import { Toast } from '@capacitor/toast';
import { AuthorPostsService } from './author-posts.service';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private sqliteService: SQLiteService,
    private authorPostsService: AuthorPostsService //private departmentEmployeesService: DepartmentEmployeesService
  ) {}

  async initializeApp() {
    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if (this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }

        // Initialize the starter_posts database
        await this.authorPostsService.initializeDatabase();

        // Initialize the starter_employees database
        //await this.departmentEmployeesService.initializeDatabase();

        // Initialize any other database if any

        this.isAppInit = true;
      } catch (error) {
        console.log(`initializeAppError: ${error}`);
        await Toast.show({
          text: `initializeAppError: ${error}`,
          duration: 'long',
        });
      }
    });
  }
}
