class User < ApplicationRecord
    has_many :entries
    has_many :user_books
    has_many :books, through: :user_books
    
    has_secure_password
    
    
    def recent_books
        self.user_books.active.sort_by{|ub| ub.last_entry}.reverse + self.user_books.planned + self.user_books.completed
    end
    
    
    
    #STATISTICS HELPER FUNCTIONS
    
    
    def total_time      #Returns total time read for user
        self.entries.sum(:time)
    end
    
    def total_pages     #Returns total pages read for user
        self.entries.sum(:pages)
    end
    
    
    # This week pages and time
    def time_this_week  
        self.entries.this_week.sum(:time)
    end
    
    def pages_this_week 
        self.entries.this_week.sum(:pages)
    end


    # This month pages and time
    def time_this_month
        self.entries.this_month.sum(:time)
    end
    
    def pages_this_month
        self.entries.this_month.sum(:pages)
    end
    
    # TODO Implement a dynamic call for any arbitrary month or date range to total pages and time
    def pages_in_range(start,stop)
    end
    
    def time_in_range(start,stop)
    end
    
end
