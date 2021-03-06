class EntriesController < ApplicationController
    #skipping authorized for now, because the components need to send the Authorization header in their requests now.
    skip_before_action :verify_authenticity_token, :authorized
    
    def index
        @entries=Entry.all
        render json: @entries
    end
    
    def create
        @entry=Entry.new(book_id: entry_params[:book_id], time: entry_params[:time], pages: entry_params[:pages])
        @entry.save
        render json: Entry.all
    end
    
    def destroy
        @entry=Entry.find(params[:id])
        @entry.destroy
    end
    
    def stats
        render json: {total_pages: Entry.total_pages, total_minutes: Entry.total_minutes, reading_rate: Entry.average_reading_rate}
    end
    
    
    private
    def entry_params
        params.require(:entry).permit(:book_id, :time, :pages)
    end
end
