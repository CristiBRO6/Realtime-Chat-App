const imageService = require('@/services/imageService');

exports.getAvatarImage = async (req, res) => {
    const id = req.params.id;
    const hash = req.query.hash;

    if (!id || !hash) return res.sendStatus(404);

    try {
        const result = await imageService.getAvatarImage(id, hash);

        if(result.status === false) return res.status(200).json(result);
        
        res.setHeader('Content-Type', result.data.contentType);
        res.status(200).send(result.data.imageData);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: false, message: err.message });
    }
};