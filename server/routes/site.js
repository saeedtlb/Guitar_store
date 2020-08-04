const router = require('express').Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Site = require('../models/site');

router.get('/site_data', async (req, res) => {
  try {
    const doc = await Site.find({});
    res.status(200).send(doc[0].siteInfo[0]);
  } catch (err) {
    res.status(400).json({ success: false, err });
  }
});

router.post('/site_info_update', auth, admin, (req, res) => {
  Site.findOneAndUpdate(
    { name: 'site' },
    { $set: { siteInfo: req.body } },
    (err, doc) => {
      if (err) res.json({ success: false, err });
      res.status(200).json({ success: true, siteInfo: doc.siteInfo });
    }
  );
});

module.exports = router;
