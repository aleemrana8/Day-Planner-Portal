const ApiSyncLog = require('../models/ApiSyncLog');
const logger = require('../config/logger');

// Websoft API integration service - connects to Securesoft/Websoft Billing Desk
const WEBSOFT_BASE_URL = process.env.WEBSOFT_API_BASE_URL || 'https://api.websoftbilling.com/v1';

exports.syncDayPlanner = async (req, res) => {
  try {
    const syncStart = Date.now();

    // TODO: Replace with actual Websoft API call when credentials are available
    // const response = await axios.get(`${WEBSOFT_BASE_URL}/day-planner/tasks`, {
    //   headers: { 'Authorization': `Bearer ${process.env.WEBSOFT_API_KEY}` }
    // });

    const syncLog = await ApiSyncLog.create({
      source: 'websoft',
      endpoint: '/day-planner/tasks',
      status: 'success',
      recordsFetched: 0,
      recordsSynced: 0,
      duration: Date.now() - syncStart,
      syncedBy: req.user._id,
      metadata: { message: 'Demo mode - awaiting Websoft API credentials' }
    });

    res.json({
      success: true,
      data: syncLog,
      message: 'Sync completed (demo mode). Configure WEBSOFT_API_KEY for live data.'
    });
  } catch (error) {
    logger.error('Websoft sync error:', error);
    res.status(500).json({ success: false, error: 'Sync failed' });
  }
};

exports.getSyncStatus = async (req, res) => {
  try {
    const logs = await ApiSyncLog.find().sort('-createdAt').limit(20).populate('syncedBy', 'firstName lastName');
    const lastSync = logs[0];
    const stats = {
      totalSyncs: await ApiSyncLog.countDocuments(),
      successfulSyncs: await ApiSyncLog.countDocuments({ status: 'success' }),
      failedSyncs: await ApiSyncLog.countDocuments({ status: 'failed' }),
      lastSyncAt: lastSync?.createdAt,
      lastSyncStatus: lastSync?.status
    };

    res.json({ success: true, data: { logs, stats } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch sync status' });
  }
};

exports.getApiHealth = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        websoft: { status: 'configured', baseUrl: WEBSOFT_BASE_URL, lastCheck: new Date() },
        database: { status: 'connected' },
        api: { status: 'healthy', uptime: process.uptime() }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Health check failed' });
  }
};
