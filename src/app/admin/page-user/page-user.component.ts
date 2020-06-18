import { Component, OnInit, Injectable } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { DataTable } from '../core/models/datatable';
import { User } from '../core/models/user'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, from } from 'rxjs';

interface ItemData {
  gender: string;
  name: Name;
  email: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

@Injectable()
export class RandomUserService {
  randomUserUrl = 'https://api.randomuser.me/';

  getUsersT(
    pageIndex: number = 1,
    pageSize: number = 20,
    sortField: string,
    sortOrder: string,
    genders: string[]
  ): Observable<{ results: ItemData[] }> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('results', `${pageSize}`)
      .append('sortField', sortField)
      .append('sortOrder', sortOrder);
    genders.forEach(gender => {
      params = params.append('gender', gender);
    });
    return this.http.get<{ results: ItemData[] }>(`${this.randomUserUrl}`, {
      params
    });
  }

  constructor(private http: HttpClient) {}
}

@Component({
  selector: 'app-page-user',
  providers: [RandomUserService],
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.css']
})
export class PageUserComponent implements OnInit {

  users = new DataTable();

  selectedUser: User = new User();

  popupUser: User = new User();

  isUserAdd = false;
  isUserUpdate = false;
  
  userLoading = true;

  pageIndex = 1;
  pageSize = 20;
  total = 1;
  listOfData: ItemData[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  filterGender = [{ text: 'male', value: 'male' }, { text: 'female', value: 'female' }];
  searchGenderList: string[] = [];


  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }

  constructor(private userService: UserService,
              private randomUserService: RandomUserService,
              private modal: NzModalService,
              private message: NzMessageService) {
      
      this.users.pageNumber = 1;
      this.users.size = 10;

      this.getUser();
    }
    
  ngOnInit(): void {
    this.searchData();
  }

  getUser() {
    this.userService.getUsers(this.users).subscribe(data => {
      this.users = data;
      this.userLoading = false;
      this.selectedUser = new User();
    });
  }

  selectUser(param) {
    this.selectedUser = param;
  }
  
  userAdd() {
    this.popupUser = new User();
    this.isUserAdd = true;
  }
  
  userAddOk() : void {
    this.userService.addUser(this.popupUser).subscribe(data => {
      this.getUser();
      this.isUserAdd = false;
      this.message.create('success', '사용자 추가가 완료되었습니다.');
    })
  }
  
  userUpdate() {
    this.popupUser = new User();
    this.popupUser.user_seq = this.selectedUser.user_seq;
    this.popupUser.user_id = this.selectedUser.user_id;
    this.popupUser.user_pw = this.selectedUser.user_pw;
    this.popupUser.email = this.selectedUser.email;
    this.popupUser.name = this.selectedUser.name;
    this.popupUser.status = this.selectedUser.status;
    this.isUserUpdate = true;
  }
  
  userUpdateOk() : void {
    this.userService.updateUser(this.popupUser, this.popupUser.user_seq).subscribe(data => {
      this.getUser();
      this.isUserUpdate = false;
      this.message.create('success', '사용자 수정이 완료되었습니다.');
    })
  }
  
  userDelete() {
    this.modal.confirm({
      nzTitle: '사용자를 삭제하시겠습니까?',
      nzContent: '',
      nzOkText: '예',
      nzOkType: 'danger',
      nzCancelText: '아니요',
      nzOnOk: () => {
        this.userService.deleteUser(this.selectedUser.user_seq).subscribe(data => {
          this.getUser();
          this.message.create('success', '사용자 삭제가 완료되었습니다.');
        })
      }
    });
  }
  
  popupCancel() : void {
    this.isUserAdd = false;
    this.isUserUpdate = false;
  }
  
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.randomUserService
      .getUsersT(this.pageIndex, this.pageSize, this.sortKey!, this.sortValue!, this.searchGenderList)
      .subscribe(data => {
        this.loading = false;
        this.total = 200;
        this.listOfData = data.results;
      });
  }

  updateFilter(value: string[]): void {
    this.searchGenderList = value;
    this.searchData(true);
  }
  

}
