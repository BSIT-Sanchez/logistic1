import { Listing } from "../models/listing.model.js";
import { ListingStocks } from "../models/listingStocks.model.js";

// Function to get the top-selling items based on the quantity sold
export const topSellingItems = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Get the listings and their total quantity sold in the last 6 months
    const listings = await Listing.find();

    const topItems = await Promise.all(
      listings.map(async (listing) => {
        const stockMovements = await ListingStocks.find({
          listing: listing._id,
          acquisitionDate: { $gte: sixMonthsAgo },
        });

        // Calculate total quantity sold for this listing
        const totalQuantitySold = stockMovements.reduce(
          (sum, stock) => sum + stock.quantity,
          0
        );

        return {
          itemCode: listing.itemCode,
          title: listing.title,
          totalQuantitySold,
        };
      })
    );

    // Sort the items based on the total quantity sold in descending order
    topItems.sort((a, b) => b.totalQuantitySold - a.totalQuantitySold);

    // Get the top 5 items
    const top5Items = topItems.slice(0, 5);

    res.status(200).json({ success: true, top5Items });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
