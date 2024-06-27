import { Component } from '@angular/core';
import { QuizItemComponent } from './quiz-item/quiz-item.component';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/modules/shared/services/helper.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent {

  constructor(public dialog: MatDialog,
    private _HelperService: HelperService){}

   //handle add
   openAddDailog(enterAnimationDuration: string, exitAnimationDuration: string, add: boolean): void {
    const dialogRef = this.dialog.open(QuizItemComponent, {
      width: '800px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        add: add
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('recored added');
      //console.log(result);
      if (result) {
        // this.addnewGroup(result)

      }


    });

  }
  addnewGroup() {
    // this._GroupsService.AddNewGreoup(addNewGroup).subscribe({
    //   next: (res) => {
    //     // console.log(res)
    //   },
    //   error: (error) => {
    //     this._HelperService.error(error)
    //   },
    //   complete: () => {
    //     this.onAllGroups();
    //     this._HelperService.success('Group added sucessfully')
    //   }

    // })
  }

}
