const { createClient } = require('@supabase/supabase-js');

// Load env vars manualy since we are running via node
const supabaseUrl = "https://vsppnvxgyyxepulnkmpi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzcHBudnhneXl4ZXB1bG5rbXBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjQ1NzcsImV4cCI6MjA4NjQwMDU3N30.cvTR5qbFDvN3XyfCnXmatkGGWFWPkNhNmmf9eJBXn_k";

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedSuperAdmin() {
    console.log("Checking for existing Super Admin key...");

    // 1. Check if key exists
    const { data: existing, error: findError } = await supabase
        .from('access_keys')
        .select('*')
        .eq('key', 'LantechSuperAdmin2026')
        .single();

    if (existing) {
        console.log("✅ Super Admin key already exists in Database.");
        console.log("Details:", existing);
        return;
    }

    if (findError && findError.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error("Error checking key:", findError);
        // We continue anyway to try insert
    }

    // 2. Insert if not exists
    console.log("Creating Super Admin key in Database...");

    // We rely on the public RLS policy being open (INSERT public check true)
    const { data, error } = await supabase
        .from('access_keys')
        .insert([
            {
                name: 'Super Admin Master',
                key: 'LantechSuperAdmin2026',
                role: 'Super Admin',
                is_active: true
            }
        ])
        .select();

    if (error) {
        console.error("❌ Failed to insert Super Admin Data:", error);
        console.log("Possible cause: RLS is restricted or Table structure mismatch.");
    } else {
        console.log("✅ SUCCESS! Super Admin key created.");
        console.log("You can now login with: LantechSuperAdmin2026");
        console.log("Data:", data);
    }
}

seedSuperAdmin();
