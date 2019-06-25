import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {IconButtonComponent} from './icon-button.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('IconButtonComponent', () => {
    let fixture: ComponentFixture<IconButtonComponent>;
    let component: IconButtonComponent;

    const MAT_ICON_SELECTOR = By.css('mat-icon');
    const BUTTON_SELECTOR = By.css('button');

    beforeEach(async(() => {
        const component = TestBed.configureTestingModule({
            declarations: [
                IconButtonComponent
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        });
        component.compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconButtonComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
    });

    it('should display the given icon', () => {
        component.icon = 'add';

        fixture.detectChanges();

        expect(fixture.debugElement.query(MAT_ICON_SELECTOR).nativeElement.innerText).toEqual('add');
    });

    it('should have an icon with the "primary" color', () => {
        expect(fixture.debugElement.query(MAT_ICON_SELECTOR).properties.color).toEqual('primary');
    });

    describe('when hovering over the button', () => {
        beforeEach(() => {
             fixture.debugElement.query(BUTTON_SELECTOR).triggerEventHandler('mouseenter', undefined);
             fixture.detectChanges();
        });

        it('should change the icon color to "accent"', () => {
             expect(fixture.debugElement.query(MAT_ICON_SELECTOR).properties.color).toEqual('accent');
        });

        describe('given the user stops hovering', () => {
            it('should change the icon color back to "primary"', () => {
                 fixture.debugElement.query(BUTTON_SELECTOR).triggerEventHandler('mouseleave', undefined);
                 fixture.detectChanges();

                 expect(fixture.debugElement.query(MAT_ICON_SELECTOR).properties.color).toEqual('primary');
            });
        });
    });

    describe('when the user clicks the button', () => {
        it('should emit the iconClick event', () => {
            spyOn(component.iconClick, 'emit');

            fixture.debugElement.query(BUTTON_SELECTOR).triggerEventHandler('click', undefined);

            expect(component.iconClick.emit).toHaveBeenCalled();
        });
    });
});
