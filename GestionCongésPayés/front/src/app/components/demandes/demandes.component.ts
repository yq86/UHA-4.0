import { Component,  OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import { startOfDay, endOfDay,isSameDay, isSameMonth, parseISO } from 'date-fns';
import { Subject } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { DemandeDateComponent } from '../demande-date/demande-date.component';
import { DemandeService } from '../../services/demande.service';
import { DemandeBody } from 'src/app/models/demandeBody';
import { TypesService } from 'src/app/services/types.service';
import Swal from 'sweetalert2'

const colors: Record<string, EventColor> = {

  sent: {
    primary: '#1e90ff',
    secondary: '#1e90ff',
  },
  validate: {
    primary: '#13F059',
    secondary: '#13F059',
  },
  refuse: {
    primary: '#DC4E30 ',
    secondary: '#DC4E30',
  },
};
@Component({
  selector: 'app-demandes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './demandes.component.html',
  styleUrls: ['./demandes.component.css']
})
export class DemandesComponent implements OnInit {

  modalContent!: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  userId!: string | null;
  token!: string | null;
  startingDate!: Date;
  endingDate!: Date;
  typeId!: number;
  viewDate: Date = new Date();
  types: Array<any> = [];
  activeDayIsOpen: boolean = true;

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1)subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: { ...colors['sent'] },
    //   actions: this.actions,
    //   allDay: true,

    // }

  ];


  constructor(
    private modalService: NgbModal,
    private dialogService: MatDialog,
    private demandeService: DemandeService,
    private typeService: TypesService,
    ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem("id");
    this.token = localStorage.getItem("accessToken");
    this.typeService.getAllTypes(this.token).subscribe(
      (response: any) => {
        this.types = response;
      }
    );
    this.events = [];
    this.demandeService.getUserDemandes(this.token, this.userId).subscribe((res) => {
      if (res) {
        res.forEach((element: DemandeBody) => {
          let cEvent: any = {};
          cEvent.start = startOfDay(new Date(element.startingDate));
          cEvent.end = endOfDay(new Date(element.endingDate));
          const type = this.types.find(type => type.id == element.TypeId);
          cEvent.title = type.name;
          if (element.StatusId == 1) {
            cEvent.color = { ...colors['sent'] };
          } else if (element.StatusId == 2) {
            cEvent.color = { ...colors['validate'] };
          } else if (element.StatusId == 3) {
            cEvent.color = { ...colors['refuse'] };
          }

          cEvent.actions = this.actions;
          cEvent.allDay = true;
          this.events.push(cEvent);
        });
      }
    });
    this.activeDayIsOpen = true;

  }

  @ViewChild('modalContent', { static: true })

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();



  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    const modalRef = this.dialogService.open(DemandeDateComponent, {
      width: '600px',
      height: '400px',
      data: {UserId: this.userId, startingDate: this.startingDate, endingDate: this.endingDate, TypeId: this.typeId}
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        const dateStart = new Date(result.startingDate);
        const ddStart = String(dateStart.getDate()).padStart(2, '0');
        const mmStart = String(dateStart.getMonth() + 1).padStart(2, '0');
        const yyyyStart = dateStart.getFullYear();
        const start = yyyyStart + '-' + mmStart + '-' + ddStart;

        const dateEnd = new Date(result.endingDate);
        const ddEnd = String(dateEnd.getDate()).padStart(2, '0');
        const mmEnd = String(dateEnd.getMonth() + 1).padStart(2, '0');
        const yyyyEnd = dateEnd.getFullYear();
        const end = yyyyEnd + '-' + mmEnd + '-' + ddEnd;
        result.startingDate = start;
        result.endingDate = end;
        // to create request

        this.demandeService.demandeConge(this.token, result).subscribe(
          (res) => {
          console.log(res)
          },
          (err) => {
            if (err.error) {
              setTimeout(() => {
                Swal.fire({
                  title: err.error,
                  confirmButtonText: 'Ok',
                  type: "warning"
                })
              }, 1000)
            }
          });
      }
    })
    this.events = [];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
