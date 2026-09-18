import { Setting } from '../models/Setting.js';
import { dbStore } from '../config/databaseStore.js';

// @desc    Get store settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    if (Setting.db && Setting.db.readyState === 1) {
      let settings = await Setting.findOne({});
      if (!settings) {
        settings = await Setting.create(dbStore.getSettings());
      }
      return res.json({ success: true, data: settings });
    }
    const settings = dbStore.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

// @desc    Update store settings
// @route   PUT /api/settings
// @access  Protected Admin
export const updateSettings = async (req, res, next) => {
  try {
    if (Setting.db && Setting.db.readyState === 1) {
      let settings = await Setting.findOne({});
      if (!settings) {
        settings = await Setting.create(req.body);
      } else {
        Object.assign(settings, req.body);
        await settings.save();
      }
      dbStore.updateSettings(req.body);
      return res.json({ success: true, data: settings });
    }

    const updated = dbStore.updateSettings(req.body);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

