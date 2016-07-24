import App from '/imports/ui/containers/App'
import LandingPage from '/imports/ui/pages/LandingPage'
import CanvasPage from '/imports/ui/pages/CanvasPage'

export default {
  path: '/',
  component: App,
  indexRoute: {
    component: LandingPage,
  },
  childRoutes: [
    {
      path: 'canvases',
      childRoutes: [
        { path: ':canvasId', component: CanvasPage },
      ],
    },
  ],
}
