/* eslint-disable camelcase */
import { BrowserAgent } from '@newrelic/browser-agent/loaders/browser-agent'

// Populate using values in copy-paste JavaScript snippet.
const options = {
  init: {
    page_view_timing: { enabled: true },
    session_trace: { enabled: true },
    session_replay: { enabled: true },
    spa: { enabled: true },
    metrics: { enabled: true },
    jserror: { enabled: true },
    generic_events: { enabled: true },
  }, // NREUM.init
  info: {
    beacon: 'bam.nr-data.net',
    errorBeacon: 'bam.nr-data.net',
    licenseKey: 'NRJS-71ef260708de28f7e87',
    applicationID: '1103388211',
  }, // NREUM.info
  loader_config: {
    accountID: '6375218',
    trustKey: '6375218',
    agentID: '1103388211',
    licenseKey: 'NRJS-71ef260708de28f7e87',
    applicationID: '1103388211',
  }, // NREUM.loader_config
}

// The agent loader code executes immediately on instantiation.
new BrowserAgent(options)
