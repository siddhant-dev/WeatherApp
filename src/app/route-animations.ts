import {
    trigger,
    transition,
    style,
    query,
    group,
    animate,
    animation,
    useAnimation,
    animateChild,
  } from '@angular/animations';

// export const slider =
//   trigger('routeAnimations', [
//     transition('* => isLeft', slideTo('left') ),
//     transition('* => isRight', slideTo('right') ),
//     transition('isLeft => isAdd', slideTo('right') ),
//     transition('isAdd => isLeft', slideTo('left') ),
//     transition('isAdd => isDetails', slideTo('right') ),
//     transition('isDetails => isAdd', slideTo('left')),
//     transition('isDetails => isRight', slideTo('right') ),
//     transition('isRight => *', slideTo('left') ),
//     transition('isLeft => *', slideTo('right') )
//   ]);

// function slideTo(direction) {
//   const optional = { optional: true };
//   return [
//     query(':enter, :leave', [
//       style({
//         position: 'absolute',
//         top: 0,
//         [direction]: 0,
//         width: '100%'
//       })
//     ], optional),
//     query(':enter', [
//       style({ [direction]: '-100%'})
//     ]),
//     group([
//       query(':leave', [
//         animate('600ms ease', style({ [direction]: '100%'}))
//       ], optional),
//       query(':enter', [
//         animate('600ms ease', style({ [direction]: '0%'}))
//       ])
//     ]),
//     // Normalize the page style... Might not be necessary

//     // Required only if you have child animations on the page
//     // query(':leave', animateChild()),
//     // query(':enter', animateChild()),
//   ];
// }


export const leftSlide = animation([
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '-100%' })
  ]),
  group([
    query(':leave', [
      animate('600ms ease', style({ left: '100%' }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', style({ left: '0' }))
    ])
  ]),
]);

export const rightSlide = animation([
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%'
    })
  ], { optional: true }),
  query(':enter', [
    style({ right: '-100%' })
  ]),
  group([
    query(':leave', [
      animate('600ms ease', style({ right: '100%' }))
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease', style({ right: '0' }))
    ])
  ]),
    query(':leave', animateChild()),
    query(':enter', animateChild()),
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', [useAnimation(leftSlide)]),
  transition('* => isRight', [useAnimation(rightSlide)]),
  transition('isLeft => isAdd', [useAnimation(rightSlide)]),
  transition('isAdd => isLeft', [useAnimation(leftSlide)]),
  transition('isAdd => isDetails', [useAnimation(rightSlide)]),
  transition('isDetails => isAdd', [useAnimation(leftSlide)]),
  transition('isDetails => isRight', [useAnimation(rightSlide)]),
  transition('isRight => *', [useAnimation(leftSlide)]),
  transition('isLeft => *', [useAnimation(rightSlide)]),
]);
