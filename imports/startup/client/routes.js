import Layout from '/imports/ui/pages/Layout'
import LandingPage from '/imports/ui/pages/LandingPage'
import CanvasPage from '/imports/ui/pages/CanvasPage'

export default {
  path: '/',
  component: Layout,
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
