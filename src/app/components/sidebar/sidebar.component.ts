import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {DatabaseService} from "../../core/services/database/database.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";


interface TreeNode {
  name: string;
  children?: TreeNode[]
}
interface ExpandableTreeNode {
  expandable: boolean;
  name: string;
  level: number;
}
interface MenuItemClickEvent {
  type: MenuItemClickEventType;
  sql?: string;
  route?: string
}
enum MenuItemClickEventType {
    SQL,
    REDIRECT
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() onTableClick: EventEmitter<string> = new EventEmitter<string>()
  readonly databases$ = this.databaseService.getDatabases();
  constructor(private databaseService: DatabaseService) {
    this.databases$.pipe(map(databases => {
      return databases.map(item => {
        console.log(item)
        return ({
          name: item.db,
          children: item.tables.map(item => ({name: item, children: []}))
        })
      })
    })).subscribe(databases => {
       console.log(databases)
      this.dataSource.data = databases
    })
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExpandableTreeNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExpandableTreeNode) => node.expandable;

  ngOnInit(): void {
  }
  clickOnTable(table: string){
    this.onTableClick.emit(table)
  }

  //context menu

  isDisplayContextMenu: boolean;
  rightClickMenuPositionX: number;
  rightClickMenuPositionY: number;

  displayContextMenu(event) {
    this.isDisplayContextMenu = true;
    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY + 12;

  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event) {
   console.log(event)
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }

}
