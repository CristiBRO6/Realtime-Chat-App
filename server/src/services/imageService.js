const { UserImage } = require('@/models');

exports.getAvatarImage = async (id, hash) => {
    try {
        const image = await UserImage.findOne({
            where: {
                userId: id,
                hash: hash
            }
        });

        if (!image) return { status: false, message: 'Image not found' };

        const imageData = Buffer.from(image.data, 'base64');
        
        return { status: true, message: 'Image retrieved successfully', data: { contentType: image.contentType, imageData: imageData } };
    } catch (err) {
        console.error(err);
        throw new Error('Failed to retrieve image');
    }
};