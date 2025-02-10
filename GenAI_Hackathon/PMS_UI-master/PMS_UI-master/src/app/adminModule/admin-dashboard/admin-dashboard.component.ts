import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartType } from 'chart.js';
import { ApiResponse, UserInfoForDashboard } from '../model/HospitalUser';
import { AdminService } from '../service/admin.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  public doctorCount:number;
  public nurseCount:number;
  public patientCount:number;
  public activeUserCount:number = 0;
  public inActiveUserCount:number = 0;
  public lockedUserCount:number = 0;
  public pieChartValuesArr:number[] = [];
  public userInfoForDashboard:UserInfoForDashboard = {
    inActiveHospitalUser: 0,
    activeHospitalUser: 0,
    blockedHospitalUser: 0,
    nurseCount: 0,
    activePatientUSer: 0,
    patientCount: 0,
    inActivePatientUser: 0,
    doctorCount: 0,
    blockedPatientUser:0
  }


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'];
  public barChartType :ChartType= 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Doctors'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Nurse'},
    {data: [80, 70, 100, 120, 80, 60, 30], label: 'Patients'}
  ];
  public pieChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public pieChartLabels = ['Active', 'Inactive', 'Locked'];
  public pieChartType:ChartType  = 'pie';
  public pieChartLegend = true;
  public pieChartData:any;

  constructor(
    private adminService:AdminService,
    private changeDetectorRef :ChangeDetectorRef,
    private snackBar: MatSnackBar
    ) { }


  ngAfterViewInit(): void {
   // this.changeDetectorRef.detectChanges();
  }

  

  ngOnInit(): void {
    this.loadDashBoardData();
   
  }
  

  public loadDashBoardData(){
    this.adminService.getDashboardData().subscribe({
      next:(result:ApiResponse)=>{
        if(result.statusCode==200){
          this.drawDashBoard(result.responseData);
        }else{
          this.snackBar.open(result.statusMessage,'OK',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          //alert(result.statusMessage);
        }
      },
      error:(err)=>{
        this.snackBar.open(err,'OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert(err);
      }
    })
  }

  public drawDashBoard(userInfoForDashboard:UserInfoForDashboard){
    this.userInfoForDashboard = userInfoForDashboard;
    this.doctorCount = userInfoForDashboard.doctorCount;
    this.nurseCount = userInfoForDashboard.nurseCount;
    this.patientCount = userInfoForDashboard.patientCount;

    this.activeUserCount = userInfoForDashboard.activeHospitalUser + userInfoForDashboard.activePatientUSer;
    this.inActiveUserCount = userInfoForDashboard.inActiveHospitalUser + userInfoForDashboard.inActivePatientUser;
    this.lockedUserCount = userInfoForDashboard.blockedHospitalUser + userInfoForDashboard.blockedPatientUser;

    this.pieChartValuesArr.push(this.activeUserCount);
    this.pieChartValuesArr.push(this.inActiveUserCount);
    this.pieChartValuesArr.push(this.lockedUserCount);

    this.pieChartData = [
      {data: this.pieChartValuesArr, label: 'Series A'}
    ];

  }
}
