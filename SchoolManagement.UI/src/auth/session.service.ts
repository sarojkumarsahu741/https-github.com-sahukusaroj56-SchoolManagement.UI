import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userId = 'userId';
  private name = 'name';
  private contactNumber = 'contactNumber';
  private roleId = 'roleId';
  private roleName = 'roleName';


  getUserId(): string | null {
    return localStorage.getItem(this.userId);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userId, userId);
  }

  getName(): string | null {
    return localStorage.getItem(this.name);
  }

  setName(name: string): void {
    localStorage.setItem(this.name, name);
  }

  getContactNumber(): string | null {
    return localStorage.getItem(this.contactNumber);
  }

  setContactNumber(contactNumber: string): void {
    localStorage.setItem(this.contactNumber, contactNumber);
  }

  getRoleId(): string | null {
    return localStorage.getItem(this.roleId);
  }

  setRoleId(roleId: string): void {
    localStorage.setItem(this.roleId, roleId);
  }

  getRoleName(): string | null {
    return localStorage.getItem(this.roleName);
  }

  setRoleName(roleName: string): void {
    localStorage.setItem(this.roleName, roleName);
  }

  clearSessions(): void {
    localStorage.removeItem(this.userId);
    localStorage.removeItem(this.name);
    localStorage.removeItem(this.contactNumber);
    localStorage.removeItem(this.roleId);
    localStorage.removeItem(this.roleName);
  }

}
