import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave',
        style({ position: 'absolute', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%) translateY(0) scale(0)' }),
          animate('1s ease-out', style({ transform: 'translateX(0%) translateY(0) scale(1)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%) translateY(0) scale(1)' }),
          animate('1s ease-out', style({ transform: 'translateX(-150%) translateY(0) scale(0)' }))
        ], { optional: true })
      ])
    ])
  ]);

  // export const slideInAnimation =
  // trigger('routeAnimations', [
  //   transition('* <=> *', [
  //     query(':enter, :leave',
  //       style({ position: 'absolute', width: '100%' }),
  //       { optional: true }),
  //     group([
  //       query(':enter', [
  //         style({ opacity: 0 }),
  //         animate('0.5s linear', style({ opacity: 1 }))
  //       ], { optional: true }),
  //       query(':leave', [
  //         style({ opacity: 1 }),
  //         animate('0.5s linear', style({ opacity: 0 }))
  //       ], { optional: true })
  //     ])
  //   ])
  // ]);
